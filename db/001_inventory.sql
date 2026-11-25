BEGIN;
CREATE EXTENSION IF NOT EXISTS btree_gist;
CREATE TABLE parking_spots (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 owner_id uuid NOT NULL,
 name text NOT NULL CHECK (length(trim(name)) BETWEEN 1 AND 80),
 area text NOT NULL CHECK (length(trim(area)) BETWEEN 1 AND 60),
 vehicle text NOT NULL CHECK (vehicle IN ('Car','Two-wheeler')),
 hourly_rate_paise integer NOT NULL CHECK (hourly_rate_paise BETWEEN 0 AND 1000000),
 active boolean NOT NULL DEFAULT true
);
CREATE TABLE bookings (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 spot_id uuid NOT NULL REFERENCES parking_spots(id),
 driver_id uuid NOT NULL,
 starts_at timestamptz NOT NULL,
 ends_at timestamptz NOT NULL,
 total_paise integer NOT NULL CHECK (total_paise >= 0),
 status text NOT NULL DEFAULT 'reserved' CHECK (status IN ('reserved','cancelled')),
 created_at timestamptz NOT NULL DEFAULT now(),
 cancelled_at timestamptz,
 CHECK (ends_at - starts_at IN (interval '1 hour',interval '2 hours',interval '3 hours',interval '4 hours')),
 CHECK ((status = 'cancelled') = (cancelled_at IS NOT NULL)),
 EXCLUDE USING gist (spot_id WITH =, tstzrange(starts_at,ends_at,'[)') WITH &&) WHERE (status = 'reserved')
);
CREATE INDEX bookings_driver_idx ON bookings(driver_id,starts_at);
-- Only a trusted server may call these functions with authenticated actor IDs.
CREATE FUNCTION reserve_spot(p_spot uuid,p_driver uuid,p_start timestamptz,p_hours integer)
RETURNS bookings LANGUAGE plpgsql AS $$
DECLARE s parking_spots; result bookings;
BEGIN
 IF p_driver IS NULL OR p_start IS NULL OR p_start <= now() OR p_hours IS NULL OR p_hours NOT BETWEEN 1 AND 4 THEN
   RAISE EXCEPTION 'Invalid reservation' USING ERRCODE='22023';
 END IF;
 SELECT * INTO s FROM parking_spots WHERE id=p_spot AND active FOR SHARE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Spot unavailable' USING ERRCODE='22023'; END IF;
 INSERT INTO bookings(spot_id,driver_id,starts_at,ends_at,total_paise)
 VALUES(s.id,p_driver,p_start,p_start+make_interval(hours=>p_hours),s.hourly_rate_paise*p_hours)
 RETURNING * INTO result;
 RETURN result;
END $$;
CREATE FUNCTION cancel_booking(p_booking uuid,p_driver uuid)
RETURNS bookings LANGUAGE plpgsql AS $$
DECLARE result bookings;
BEGIN
 UPDATE bookings SET status='cancelled',cancelled_at=now()
 WHERE id=p_booking AND driver_id=p_driver AND status='reserved' AND starts_at>now()
 RETURNING * INTO result;
 IF NOT FOUND THEN RAISE EXCEPTION 'Booking cannot be cancelled' USING ERRCODE='22023'; END IF;
 RETURN result;
END $$;
REVOKE ALL ON FUNCTION reserve_spot(uuid,uuid,timestamptz,integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION cancel_booking(uuid,uuid) FROM PUBLIC;
COMMIT;
