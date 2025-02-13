import { Client, Role } from 'discord.js';

/**
 * @handler Role Events
 * @related roleUpdate
 */
export async function handleRoleUpdateEvent(client: Client, oldRole: Role, newRole: Role) {
    let emitted = false;
    /**
     * @event rolePositionUpdate
     * @description Emitted when a role position changes.
     * @param {DJS:Role} role The role whose position has changed.
     * @param {number} oldPosition The old role position.
     * @param {number} newPosition The new role position.
     * @example
     * client.on("rolePositionUpdate", (role, oldPosition, newPosition) => {
     *   console.log(role.name + " was at position "+oldPosition+" and now is at position "+newPosition);
     * });
     */
    if (oldRole.rawPosition !== newRole.rawPosition) {
        client.emit('rolePositionUpdate', newRole, oldRole.rawPosition, newRole.rawPosition);
        emitted = true;
    }
    /**
     * @event unhandledRoleUpdate
     * @description Emitted when the roleUpdate event is triggered but discord-logs didn't trigger any custom event.
     * @param {DJS:Role} oldRole The role before the update.
     * @param {DJS:Role} newRole The role after the update.
     * @example
     * client.on("unhandledRoleUpdate", (oldRole, newRole) => {
     *   console.log("Role '"+oldRole.id+"' was updated but discord-logs couldn't find what was updated...");
     * });
     */
    if (!emitted) {
        client.emit('unhandledRoleUpdate', oldRole, newRole);
    }
}
