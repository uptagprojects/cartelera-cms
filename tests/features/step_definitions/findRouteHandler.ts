import AntPathMatcher from "ant-path-matcher";
import * as CoursesHandler from "../../../src/app/api/courses/route";
import * as CoursesIdHandler from "../../../src/app/api/courses/[id]/route";const { match } = new AntPathMatcher();

const API_ROUTE_HANDLERS = new Map<string, any>([
    [ "/api/courses", CoursesHandler ],
    [ "/api/courses/{id}",  CoursesIdHandler ],
    [ "/api/events",  null ],
    [ "/api/events/{email}", null ]
]);

export const findRouteHandler = (path: string): any => {
    for (let [route, handler] of API_ROUTE_HANDLERS.entries()) {
        if (match(route, path)) {
            return handler;
        }
    }
    return null;
}
