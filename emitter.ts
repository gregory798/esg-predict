import mitt, { type EventType, type Emitter as Mitt } from "mitt"

export const emitter = mitt()
export type Emitter<T extends Record<EventType, unknown>> = Mitt<T>
