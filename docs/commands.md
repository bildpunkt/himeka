# Commands

This document details the currently available commands for Himeka.

**Note:** This should be replaced by a `!help` command in the near future.

| Command                  | Requires Admin? | Description                                                           |
| ------------------------ | --------------- | --------------------------------------------------------------------- |
| `!add-admin [id]`        | `yes`           | Sets the User with the ID `[id]` as an Admin for this Himeka instance |
| `!remove-admin [id]`     | `yes`           | Revokes admin permission for the User with the ID `[id]`              |
| `!enable [command]`      | `yes`           | Enables the command with the name `[command]` to be used              |
| `!disable [command]`     | `yes`           | Disables the command with the name `[command]` from being used        |
| `!index-roles`           | `yes`           | Indexes all roles from the server into your Himeka instance database  |
| `!whitelist-role [role]` | `yes`           | Whitelists the role with the name `[role]` for self-assigning         |
| `!blacklist-role [role]` | `yes`           | Blacklists the role with the name `[role]` for self-assigning         |
| `!assign-role [role]`    | `no`            | Assigns the role with the name `[role]` to yourself                   |
| `!deassign-role [role]`  | `no`            | Removes the role with the name `[role]` from yourself                 |

## Non-usable commands

These are commands that are executed on server events other than `message`

| Command             | Description                                    |
| ------------------- | ---------------------------------------------- |
| `role-create-event` | Adds a newly created role to the database      |
| `role-delete-event` | Removes the deleted role from the database     |
| `role-update-event` | Updates a role from the server in the database |
