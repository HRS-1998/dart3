let permissionData = {
  data: [],
  state: true,
  errorState: false,
  noPermissionTip: '[当前无权限访问]',
  errTip: '[权限接口获取失败]',
  alias: null,
  router: null,
  url: 'http://admin.ct108.net/403.html',
};

const Permission = {
  is: function (value: any) {
    let result = false;
    let aliasValue: any;

    if (permissionData.alias && (permissionData.alias as any)[value]) {
      aliasValue = (permissionData.alias as any)[value];
    } else {
      aliasValue = value;
    }

    permissionData.data.forEach((item) => {
      if (item === aliasValue) {
        result = true;
      }
    });
    return result;
  },
  go403: function () {
    const url = encodeURIComponent(window.location.href);
    if (permissionData.url) {
      window.location.href = `${permissionData.url}?url=${url}`;
    }
  },
  route: function (router: any) {
    router.beforeEach((to: any, from: any, next: any) => {
      if (to.fullPath === '/no-permission') {
        this.go403();
        return;
      }

      const requireAuth = to.matched.some((record: any) => {
        return typeof record.meta.permission !== 'undefined';
      });

      if (permissionData.state === false) {
        this.go403();
        return;
      }
      if (!requireAuth) {
        next();
        return;
      }

      const hasPermission = to.matched.every((record: any) => {
        const permissionCode = record.meta.permission;

        if (typeof permissionCode !== 'undefined') {
          return Permission.is(permissionCode);
        }
        return true;
      });

      if (!hasPermission) {
        this.go403();
        return;
      }
      next();
    });
  },
  setDefaults: function (opt: any) {
    if (typeof opt === 'undefined') {
      return;
    }
    permissionData = Object.assign({}, permissionData, opt);

    if (permissionData.router) {
      Permission.route(permissionData.router);
    }
  },
  getData() {
    return permissionData;
  },
  success: function (value: any) {
    permissionData.data = value;
    permissionData.state = true;
  },
  fail: function () {
    permissionData.data = [];
    permissionData.state = false;
  },
  error() {
    permissionData.errorState = true;
    permissionData.state = false;
  },
  setData(opt: any) {
    permissionData = Object.assign({}, permissionData, opt);
  },
};

export default Permission;
