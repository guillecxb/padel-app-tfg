import uuid from "uuid-random";
import TraceParent from "traceparent";

export const getParentHeader = () => {
  const version = Buffer.alloc(1).toString("hex");
  const buffer = uuid.bin();
  const traceId = buffer.slice(0, 16).toString("hex");
  const parentId = buffer.slice(0, 8).toString("hex");
  const flags = "01";
  return TraceParent.fromString(`${version}-${traceId}-${parentId}-${flags}`);
};
