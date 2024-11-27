import TimeAgo from "javascript-time-ago";
import es from "javascript-time-ago/locale/es";

TimeAgo.addDefaultLocale(es);

const timeAgo = new TimeAgo("es-ES");

export const formatDate = (date: string): string => timeAgo.format(new Date(date));
