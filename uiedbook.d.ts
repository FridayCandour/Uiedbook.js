declare type Uied = {
  style(obj: Partial<HTMLElement["style"]>): void;
  config(obj: Partial<HTMLElement>): void;
  appendTo(type: string, attribute: Record<string, string>, number?: number): void;
  evft(e: Event): void;
};
declare type BaseE = HTMLElement | NodeListOf<HTMLElement>;
/** the u function is a powerful selector function with added attributes to manipulate dom elements, it does it in a more fast and efficient manner. */
export declare const u: (el: string | BaseE, ifAll_OrNum?: number | boolean | undefined) => Uied;
/**
 * this context used for rendering built layout to a parent or the document body
 *
 * example
 *
 * const p =   build("span", { innerText: "am a span", title: "title" });
 *
buildTo(p, "body");
*/
export declare const buildTo: (child: Node, parent: string | HTMLElement) => void;
export declare const route: (path: string | undefined, templateId: string, controller: () => any) => HTMLAnchorElement;
/** in construction */
export declare const xhr: (type: string, url: string | URL) => (this: XMLHttpRequest) => any;
/** for checking for empty objects */
export declare const isEmptyObject: (obj: any) => obj is Record<string | number | symbol, never>;
export declare const intersect: (
  target: string,
  opt: IntersectionObserverInit,
  callback: IntersectionObserverCallback
) => void;
/** `error("there was an error!");` */
export declare const error: (msg: string) => never;
/** the get function is the u function but without any sweet methods it is used if you want to enjoy the easiness of the u function but don't want to use it awesome methods */
export declare const get: <All extends number | boolean | undefined = undefined>(
  el: string | BaseE,
  ifAll_OrNum?: All | undefined
) => (All extends undefined ? HTMLElement : NodeListOf<HTMLElement>) | null;
/** for making css classes */
export declare const makeClass: (name: string, stylings: string) => void;
/** it's self explanatory some how */
export declare const create: (type?: string, id?: string) => HTMLElement;
/** an easy to use download function that returns the link element that should be clicked */
export declare const download: (
  type: string,
  source: {
    buffer: Uint8Array;
  },
  name: string
) => HTMLAnchorElement;
export declare const debounce: (func: () => void, timeout?: number) => void;
/** the grandmother algorith for managing ids of anything, don't use it if you don't understand it's power it looks simple. */
export declare const keep: (id: string | Record<string, number>, time: number) => true | undefined;
export declare const check: (id: string) => boolean;
export declare const log: (message: any) => string[] | undefined;
/** it's self explanatory some how */
export declare const store: (name: string, value: any) => void;
export declare const retrieve: (name: string) => string | null;
export declare const remove: (name: string) => void;
export declare const getKey: (index: number) => string | null;
export declare const clear: () => void;
/** for handling even more complicated key events, it's built with the grandmother algorimth or code */
export declare const onKeys: (
  keys: [],
  callback: (this: Event) => void,
  object?: Document,
  delay?: number,
  lock?: boolean
) => void;
/** under construction!!!!!!! */
export declare const continuesKeys: (
  keys: string[],
  callback: (this: Event) => void,
  delay?: number,
  object?: Document,
  lock?: boolean
) => void;
export declare const swipe: (item: Record<string, () => any>) => void;
/** this is used for creating pixel stable game views across all screen width with no pixelation problem try and see the magic */
export declare const buildCanvas: (id: string, w?: number, h?: number) => HTMLCanvasElement;
export declare const appendCanvas: (id: string, h: number, w: number, parent: HTMLElement) => HTMLCanvasElement;
/** this is the RE game time line algorimth */
export declare const re: {
  build: (viewID: string) => HTMLDivElement;
  makeWidget: (this: any, name: string) => any;
  mount: (template: any, callback: () => void) => void;
  start: () => void;
  loadImage: (img: string | string[], id: string) => void;
  loadAudio: (aud: string | string[], id: string) => void;
  getImg: (id: string) => HTMLImageElement;
  getAud: (id: string) => HTMLAudioElement;
  cancel: () => void;
};
export declare const speaker: (text: string, language?: string, volume?: number, rate?: number, pitch?: number) => void;
export declare const speakerStop: () => void;
/** play mp3 or wav audio from a local file or url  */
export declare const audio: (
  this: {
    audio: HTMLAudioElement;
  },
  audio: HTMLAudioElement,
  loop?: number,
  volumeScale?: number
) => HTMLAudioElement;
export declare const bgPainter: (
  this: any,
  img: HTMLImageElement,
  speed: number | undefined,
  up: boolean,
  left: boolean
) => void;
export declare const physics: {
  detectCollision: (ent: any, name: any, reduce?: number) => void;
};
export {};
