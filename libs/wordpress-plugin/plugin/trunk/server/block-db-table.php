<?php

// The following minimum versions are the minimum versions that support the JSON data type.
// see https://dev.mysql.com/doc/relnotes/mysql/5.7/en/news-5-7-8.html#mysqld-5-7-8-json
const BLOCK_PROTOCOL_MINIMUM_MYSQL_VERSION = "5.7.8";
// See https://mariadb.com/kb/en/mariadb-1027-release-notes/
const BLOCK_PROTOCOL_MINIMUM_MARIADB_VERSION = "10.2.7";

function block_protocol_database_at_version(string $mysql_version, string $mariadb_version)
{

  global $wpdb;
  
  $db_version = $wpdb->db_version();
  $db_server_info = $wpdb->db_server_info();

  if (strpos($db_server_info, 'MariaDB') != false) {
    // site is using MariaDB
    return strnatcmp($db_version, $mariadb_version) >= 0;
  } else {
    // site is using MySQL
    return strnatcmp($db_version, $mysql_version) >= 0;
  }
}

function block_protocol_is_database_supported()
{
  return block_protocol_database_at_version(
    BLOCK_PROTOCOL_MINIMUM_MYSQL_VERSION,
    BLOCK_PROTOCOL_MINIMUM_MARIADB_VERSION
  );
}

function block_protocol_migration_1()
{
  global $wpdb;
  $charset_collate = $wpdb->get_charset_collate();

  $sql = "CREATE TABLE `{$wpdb->prefix}block_protocol_entities` (
    -- common data across all entities
    entity_id char(36) NOT NULL,
    entity_type_id text NOT NULL,
    properties json,
    created_by_id bigint(20) UNSIGNED NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by_id bigint(20) UNSIGNED NOT NULL,
    updated_at datetime NOT NULL,

    -- metadata for entities which represent links only
    left_entity_id char(36) REFERENCES `{$wpdb->prefix}block_protocol_entities` (entity_id) ON DELETE CASCADE,
    right_entity_id char(36) REFERENCES `{$wpdb->prefix}block_protocol_entities` (entity_id) ON DELETE CASCADE,
    left_to_right_order int UNSIGNED,
    right_to_left_order int UNSIGNED,

    PRIMARY KEY (entity_id),

    INDEX (left_entity_id),
    INDEX (right_entity_id),
    INDEX (created_at),
    INDEX (updated_at)
  ) $charset_collate;";

  require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

  dbDelta($sql);
  block_protocol_maybe_capture_error($wpdb->last_error);
}

function block_protocol_set_migration_version_to(int $migration_version)
{
  global $wpdb;

  if (!$wpdb->last_error){
    update_site_option('block_protocol_db_migration_version', $migration_version);
  }
}

function block_protocol_migrate()
{
  $saved_version = (int) get_site_option('block_protocol_db_migration_version');

  // Don't apply migrations if the DB version is unsupported.
  if (!block_protocol_is_database_supported()) {
    return;
  }

  if ($saved_version < 2) {
    block_protocol_migration_1();
    block_protocol_set_migration_version_to(2);
  }

  // future migrations go here
}

function block_protocol_database_available() 
{
  $migration_version = get_site_option('block_protocol_db_migration_version');
  return block_protocol_is_database_supported() && is_numeric($migration_version);
}

add_action('admin_init', 'block_protocol_migrate');

function count_block_protocol_entities()
{
  global $wpdb;

  $table = get_block_protocol_table_name();

  $sql = "SELECT count(*) FROM {$table};";

  $count = $wpdb->get_var($sql);

  block_protocol_maybe_capture_error($wpdb->last_error);
  return $count;
}
?>
