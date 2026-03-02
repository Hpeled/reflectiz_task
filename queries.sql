
SELECT * FROM selectors; -- 1. Retrieve All Records: Fetch all data from the selectors table
SELECT selector FROM selectors WHERE field_name = 'email'; -- 2. Search by Field: Find a record based on a specific field name
UPDATE selectors SET value = '+447000000000' WHERE field_name = 'phone'; -- 3. Update Record: Update the value for a specific field
DELETE FROM selectors WHERE field_name = 'uncheck_remember_card'; -- 4. Delete Record: Remove a specific record from the table