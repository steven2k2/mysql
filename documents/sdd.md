### Table: `meter_information`

#### Purpose
The `meter_information` table stores comprehensive details about each water meter managed by the utility company. It provides essential information for tracking, billing, maintenance, and customer association, enabling effective management of water resources and ensuring accurate billing for customers.

#### Schema

| Column               | Data Type              | Description                                                                                         |
|----------------------|------------------------|-----------------------------------------------------------------------------------------------------|
| `meter_id`           | `INT` (Primary Key)    | Unique identifier for each meter; auto-incremented for easy indexing.                               |
| `serial_number`      | `VARCHAR(50)`          | Unique serial number provided by the manufacturer. Ensures no duplicate meters are recorded.        |
| `installation_date`  | `DATE`                 | Date on which the meter was installed. Useful for warranty and maintenance schedules.               |
| `location_address`   | `VARCHAR(255)`         | Physical address where the meter is located.                                                        |
| `location_latitude`  | `DECIMAL(9, 6)`        | GPS latitude for precise meter location tracking.                                                   |
| `location_longitude` | `DECIMAL(9, 6)`        | GPS longitude for precise meter location tracking.                                                  |
| `meter_type`         | `VARCHAR(50)`          | Type of meter (e.g., analog, digital, smart).                                                       |
| `meter_make_model`   | `VARCHAR(100)`         | Manufacturer and model details for identifying meter specifications.                                |
| `meter_size`         | `DECIMAL(5, 2)`        | Size of the meter (in inches or mm) to aid in capacity and compatibility checks.                    |
| `capacity`           | `DECIMAL(10, 2)`       | Maximum capacity or flow rate of the meter (e.g., in gallons per minute or cubic meters).           |
| `status`             | `ENUM`                 | Current status of the meter: `active`, `inactive`, or `suspended`.                                  |
| `customer_id`        | `INT` (Foreign Key)    | References the `customer_id` in the `customers` table to associate the meter with a specific customer. |
| `last_reading_date`  | `DATE`                 | Date when the last reading was recorded.                                                            |
| `cumulative_usage`   | `DECIMAL(12, 3)`       | Total cumulative water usage recorded by this meter (useful for billing and monitoring).            |
| `last_maintenance_date` | `DATE`              | Date of the last maintenance service performed on the meter.                                        |
| `created_at`         | `TIMESTAMP`            | Automatically recorded timestamp for when the record was created.                                   |
| `updated_at`         | `TIMESTAMP`            | Automatically updated timestamp for the last modification of the record.                            |

#### Relationships

- **Customer Association**: The `customer_id` field is a foreign key referencing the `customers` table, linking each meter to a specific customer.
- **Maintenance and Service Tracking**: Fields like `last_maintenance_date` and `last_reading_date` support service history and scheduling.

#### Constraints

- **Unique Serial Number**: The `serial_number` field is marked as unique to ensure no two meters have the same serial.
- **GPS Coordinates**: Fields `location_latitude` and `location_longitude` are optional but recommended for precise meter tracking.
- **Status Enum**: Restricted to three values (`active`, `inactive`, `suspended`), ensuring the status is standardized across entries.

#### Usage

This table is crucial for:
- **Billing**: Tracks cumulative usage and latest readings to calculate customer charges.
- **Service and Maintenance**: Schedules maintenance based on installation and last maintenance dates.
- **Asset Management**: Manages physical locations, specifications, and operational statuses of each meter.

#### Example Query

Retrieve all active meters with their last reading date and cumulative usage:

```sql
SELECT meter_id, serial_number, location_address, last_reading_date, cumulative_usage
FROM meter_information
WHERE status = 'active';