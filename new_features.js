/* eslint-disable prettier/prettier */
// building a contact api for uiedbook
export async function getContacts(config) {
    const props = ["name", "email", "tel", "address", "icon"];
    const opts = { multiple: true };
    const supported = "contacts" in navigator && "contactsManager" in window;
    if (supported) {
        let contacts;
        if (config.multiple) {
            contacts = await navigator.contacts.select(props, opts);
        }
        else {
            contacts = await navigator.contacts.select(props, opts);
        }
        return contacts;
    }
    else {
        return false;
    }
}
// device rotation
export function useDeviceMotion(fuc) {
    window.addEventListener("devicemotion", fuc, false);
}
// export async function conectBluetooth(): void {
//   const device = await navigator.bluetooth.requestDevice({ filter: [] });
// }
// export function whenDeviceIsIdle(filter: boolean) {
//   const idleDetector = new IdleDetector();
//   idleDetector.addEventListener("change", () => {
//     const { userState, screenState } = idleDetector;
//     if (userstate == "idle") {
// update the database with the status
//     }
//   });
//   await idleDetector.start({
//     thrshold: 120000
//   });
// }
export function useFileSystem() {
    return {
        async get() {
            const [handle] = await window.showOpenFilePicker();
            const file = await handle.getFile();
        },
        async write(fileToSave) {
            const saveFileHandle = await window.showSaveFilePicker();
            const writable = saveFileHandle.createWritable();
            // check for errors here after
            await writable.write(fileToSave);
            await writable.close();
        }
    };
}
