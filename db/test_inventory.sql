BEGIN;
DO $$
DECLARE s uuid; d uuid := gen_random_uuid(); other_driver uuid := gen_random_uuid(); a bookings; t timestamptz := now()+interval '1 day';
BEGIN
 INSERT INTO parking_spots(owner_id,name,area,vehicle,hourly_rate_paise)
 VALUES(gen_random_uuid(),'Test bay','Bengaluru','Car',5000) RETURNING id INTO s;
 a := reserve_spot(s,d,t,2);
 IF a.total_paise <> 10000 THEN RAISE EXCEPTION 'Wrong price'; END IF;
 BEGIN
  PERFORM reserve_spot(s,other_driver,t+interval '1 hour',1);
  RAISE EXCEPTION 'Overlap accepted';
 EXCEPTION WHEN exclusion_violation THEN NULL;
 END;
 PERFORM reserve_spot(s,other_driver,t+interval '2 hours',1);
 BEGIN
  PERFORM cancel_booking(a.id,other_driver);
  RAISE EXCEPTION 'Unauthorized cancellation accepted';
 EXCEPTION WHEN invalid_parameter_value THEN NULL;
 END;
 PERFORM cancel_booking(a.id,d);
 PERFORM reserve_spot(s,other_driver,t,2);
 BEGIN
  PERFORM reserve_spot(s,d,now()-interval '1 hour',1);
  RAISE EXCEPTION 'Past arrival accepted';
 EXCEPTION WHEN invalid_parameter_value THEN NULL;
 END;
END $$;
ROLLBACK;
