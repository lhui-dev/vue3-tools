import { defineStore } from 'pinia';
import type { IApplicationState, IComponentSize, IDeviceType, IThemeType } from './types';

export const appStore = defineStore('application-store', {
  state: (): IApplicationState => {
    return {
      deviceType: 'pc',
      componentSize: 'default',
      theme: 'white',
      isCollapse: false,
    };
  },
  actions: {
    setDeviceType(deviceType: IDeviceType): void {
      this.deviceType = deviceType;
    },
    setComponentSize(size: IComponentSize): void {
      this.componentSize = size;
    },
    setTheme(theme: IThemeType) {
      this.theme = theme;
    },
    toggleIsCollapse(isCollapse: boolean): void {
      this.isCollapse = isCollapse;
    }
  },
  getters: {
    curComponentSize(): IComponentSize {
      return this.componentSize;
    },
    curTheme(): IThemeType {
      return this.theme;
    },
    curDeviceType(): IDeviceType {
      return this.deviceType;
    }
  }
});
