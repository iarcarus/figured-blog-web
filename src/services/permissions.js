import store from './../store/store'

export function getPermissions() {
    const permissionList = store.state.currentUser.permissions
    return permissionList || []
}

export function hasPermission(module) {
    return Boolean(getPermissions().filter(permission => {
        return permission.permission === module
    }).length)
}
