DELIMITER $$

USE `bisublarlms`$$

DROP PROCEDURE IF EXISTS `sp_admins_login`$$

CREATE DEFINER=`bisublar_LMSUser`@`%` PROCEDURE `sp_user_login`(
	IN _username VARCHAR(255),
	IN _passcode VARCHAR(255)
    )
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
        BEGIN
            ROLLBACK;
            RESIGNAL;
        END;
	START TRANSACTION;
	-- #########START#########
	
	SET @_count:=(SELECT COUNT(*)FROM admins WHERE username = _username AND `passcode` = _passcode);
	IF @_count > 0 THEN
		-- select *, now()server_date from admins where username = _username and `password` = MD5(_password);
		SELECT userId, NAME, office, gender 
		FROM admins 
		WHERE username = _username AND passcode = _passcode ;
	ELSE
		SELECT 'no_data' _ret;
	END IF;
	
	-- ##########END##########
	COMMIT;
    END$$

DELIMITER ;