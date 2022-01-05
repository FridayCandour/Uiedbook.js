declare type props = {
    multiple: boolean;
};
export declare function getContacts(config: props): Promise<string | string[] | boolean>;
export declare function useDeviceMotion(fuc: (ev: DeviceMotionEvent) => void): void;
export declare function useFileSystem(): void;
export {};
