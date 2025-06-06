/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/project/invite/route";
exports.ids = ["app/api/project/invite/route"];
exports.modules = {

/***/ "(rsc)/./app/api/project/invite/route.ts":
/*!*****************************************!*\
  !*** ./app/api/project/invite/route.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function POST(req) {\n    try {\n        const authHeader = req.headers.get(\"authorization\");\n        const token = authHeader?.split(\" \")[1];\n        if (!token) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"인증 토큰 없음\"\n            }, {\n                status: 401\n            });\n        }\n        const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().verify(token, process.env.JWT_SECRET);\n        const { projectId, email } = await req.json();\n        // 프로젝트의 소유자인지 확인\n        const project = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].project.findUnique({\n            where: {\n                id: projectId\n            }\n        });\n        if (!project || project.userId !== decoded.userId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"초대 권한이 없습니다.\"\n            }, {\n                status: 403\n            });\n        }\n        // 초대할 사용자 확인\n        const userToInvite = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].user.findUnique({\n            where: {\n                email\n            }\n        });\n        if (!userToInvite) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"사용자 없음\"\n            }, {\n                status: 404\n            });\n        }\n        // 중복 초대 방지\n        const existing = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].projectMember.findFirst({\n            where: {\n                projectId,\n                userId: userToInvite.id\n            }\n        });\n        if (existing) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"이미 초대된 사용자입니다.\"\n            }, {\n                status: 409\n            });\n        }\n        // 초대 실행\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].projectMember.create({\n            data: {\n                projectId,\n                userId: userToInvite.id\n            }\n        });\n        // 초대한 인원 수 증가\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].project.update({\n            where: {\n                id: projectId\n            },\n            data: {\n                invitedCount: {\n                    increment: 1\n                }\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"초대 완료\"\n        });\n    } catch (err) {\n        console.error(\"초대 실패:\", err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"서버 오류\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Byb2plY3QvaW52aXRlL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQTJDO0FBQ0M7QUFDYjtBQUV4QixlQUFlRyxLQUFLQyxHQUFZO0lBQ3JDLElBQUk7UUFDRixNQUFNQyxhQUFhRCxJQUFJRSxPQUFPLENBQUNDLEdBQUcsQ0FBQztRQUNuQyxNQUFNQyxRQUFRSCxZQUFZSSxNQUFNLElBQUksQ0FBQyxFQUFFO1FBRXZDLElBQUksQ0FBQ0QsT0FBTztZQUNWLE9BQU9SLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBVyxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDaEU7UUFFQSxNQUFNQyxVQUFVWCwwREFBVSxDQUFDTSxPQUFPTyxRQUFRQyxHQUFHLENBQUNDLFVBQVU7UUFJeEQsTUFBTSxFQUFFQyxTQUFTLEVBQUVDLEtBQUssRUFBRSxHQUFHLE1BQU1mLElBQUlNLElBQUk7UUFFM0MsaUJBQWlCO1FBQ2pCLE1BQU1VLFVBQVUsTUFBTW5CLG1EQUFNQSxDQUFDbUIsT0FBTyxDQUFDQyxVQUFVLENBQUM7WUFDOUNDLE9BQU87Z0JBQUVDLElBQUlMO1lBQVU7UUFDekI7UUFFQSxJQUFJLENBQUNFLFdBQVdBLFFBQVFJLE1BQU0sS0FBS1gsUUFBUVcsTUFBTSxFQUFFO1lBQ2pELE9BQU94QixxREFBWUEsQ0FBQ1UsSUFBSSxDQUN0QjtnQkFBRUMsT0FBTztZQUFlLEdBQ3hCO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxhQUFhO1FBQ2IsTUFBTWEsZUFBZSxNQUFNeEIsbURBQU1BLENBQUN5QixJQUFJLENBQUNMLFVBQVUsQ0FBQztZQUFFQyxPQUFPO2dCQUFFSDtZQUFNO1FBQUU7UUFDckUsSUFBSSxDQUFDTSxjQUFjO1lBQ2pCLE9BQU96QixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQVMsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQzlEO1FBRUEsV0FBVztRQUNYLE1BQU1lLFdBQVcsTUFBTTFCLG1EQUFNQSxDQUFDMkIsYUFBYSxDQUFDQyxTQUFTLENBQUM7WUFDcERQLE9BQU87Z0JBQ0xKO2dCQUNBTSxRQUFRQyxhQUFhRixFQUFFO1lBQ3pCO1FBQ0Y7UUFDQSxJQUFJSSxVQUFVO1lBQ1osT0FBTzNCLHFEQUFZQSxDQUFDVSxJQUFJLENBQ3RCO2dCQUFFQyxPQUFPO1lBQWlCLEdBQzFCO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxRQUFRO1FBQ1IsTUFBTVgsbURBQU1BLENBQUMyQixhQUFhLENBQUNFLE1BQU0sQ0FBQztZQUNoQ0MsTUFBTTtnQkFDSmI7Z0JBQ0FNLFFBQVFDLGFBQWFGLEVBQUU7WUFDekI7UUFDRjtRQUVBLGNBQWM7UUFDZCxNQUFNdEIsbURBQU1BLENBQUNtQixPQUFPLENBQUNZLE1BQU0sQ0FBQztZQUMxQlYsT0FBTztnQkFBRUMsSUFBSUw7WUFBVTtZQUN2QmEsTUFBTTtnQkFDSkUsY0FBYztvQkFBRUMsV0FBVztnQkFBRTtZQUMvQjtRQUNGO1FBRUEsT0FBT2xDLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7WUFBRXlCLFNBQVM7UUFBUTtJQUM5QyxFQUFFLE9BQU9DLEtBQUs7UUFDWkMsUUFBUTFCLEtBQUssQ0FBQyxVQUFVeUI7UUFDeEIsT0FBT3BDLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUFRLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQzdEO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcZGtmZnBcXG15LWFwcFxcbXktYXBwXFxiYWNrZW5kXFxhcHBcXGFwaVxccHJvamVjdFxcaW52aXRlXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcclxuaW1wb3J0IHByaXNtYSBmcm9tIFwiLi4vLi4vLi4vLi4vbGliL3ByaXNtYVwiO1xyXG5pbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBhdXRoSGVhZGVyID0gcmVxLmhlYWRlcnMuZ2V0KFwiYXV0aG9yaXphdGlvblwiKTtcclxuICAgIGNvbnN0IHRva2VuID0gYXV0aEhlYWRlcj8uc3BsaXQoXCIgXCIpWzFdO1xyXG5cclxuICAgIGlmICghdG9rZW4pIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwi7J247KadIO2GoO2BsCDsl4bsnYxcIiB9LCB7IHN0YXR1czogNDAxIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRlY29kZWQgPSBqd3QudmVyaWZ5KHRva2VuLCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUISkgYXMge1xyXG4gICAgICB1c2VySWQ6IG51bWJlcjtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgeyBwcm9qZWN0SWQsIGVtYWlsIH0gPSBhd2FpdCByZXEuanNvbigpO1xyXG5cclxuICAgIC8vIO2UhOuhnOygne2KuOydmCDshozsnKDsnpDsnbjsp4Ag7ZmV7J24XHJcbiAgICBjb25zdCBwcm9qZWN0ID0gYXdhaXQgcHJpc21hLnByb2plY3QuZmluZFVuaXF1ZSh7XHJcbiAgICAgIHdoZXJlOiB7IGlkOiBwcm9qZWN0SWQgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghcHJvamVjdCB8fCBwcm9qZWN0LnVzZXJJZCAhPT0gZGVjb2RlZC51c2VySWQpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6IFwi7LSI64yAIOq2jO2VnOydtCDsl4bsirXri4jri6QuXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAzIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDstIjrjIDtlaAg7IKs7Jqp7J6QIO2ZleyduFxyXG4gICAgY29uc3QgdXNlclRvSW52aXRlID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGVtYWlsIH0gfSk7XHJcbiAgICBpZiAoIXVzZXJUb0ludml0ZSkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCLsgqzsmqnsnpAg7JeG7J2MXCIgfSwgeyBzdGF0dXM6IDQwNCB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDspJHrs7Ug7LSI64yAIOuwqeyngFxyXG4gICAgY29uc3QgZXhpc3RpbmcgPSBhd2FpdCBwcmlzbWEucHJvamVjdE1lbWJlci5maW5kRmlyc3Qoe1xyXG4gICAgICB3aGVyZToge1xyXG4gICAgICAgIHByb2plY3RJZCxcclxuICAgICAgICB1c2VySWQ6IHVzZXJUb0ludml0ZS5pZCxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgaWYgKGV4aXN0aW5nKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IGVycm9yOiBcIuydtOuvuCDstIjrjIDrkJwg7IKs7Jqp7J6Q7J6F64uI64ukLlwiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwOSB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g7LSI64yAIOyLpO2WiVxyXG4gICAgYXdhaXQgcHJpc21hLnByb2plY3RNZW1iZXIuY3JlYXRlKHtcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHByb2plY3RJZCxcclxuICAgICAgICB1c2VySWQ6IHVzZXJUb0ludml0ZS5pZCxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIOy0iOuMgO2VnCDsnbjsm5Ag7IiYIOymneqwgFxyXG4gICAgYXdhaXQgcHJpc21hLnByb2plY3QudXBkYXRlKHtcclxuICAgICAgd2hlcmU6IHsgaWQ6IHByb2plY3RJZCB9LFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgaW52aXRlZENvdW50OiB7IGluY3JlbWVudDogMSB9LFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgbWVzc2FnZTogXCLstIjrjIAg7JmE66OMXCIgfSk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwi7LSI64yAIOyLpO2MqDpcIiwgZXJyKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIuyEnOuyhCDsmKTrpZhcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicHJpc21hIiwiand0IiwiUE9TVCIsInJlcSIsImF1dGhIZWFkZXIiLCJoZWFkZXJzIiwiZ2V0IiwidG9rZW4iLCJzcGxpdCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImRlY29kZWQiLCJ2ZXJpZnkiLCJwcm9jZXNzIiwiZW52IiwiSldUX1NFQ1JFVCIsInByb2plY3RJZCIsImVtYWlsIiwicHJvamVjdCIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImlkIiwidXNlcklkIiwidXNlclRvSW52aXRlIiwidXNlciIsImV4aXN0aW5nIiwicHJvamVjdE1lbWJlciIsImZpbmRGaXJzdCIsImNyZWF0ZSIsImRhdGEiLCJ1cGRhdGUiLCJpbnZpdGVkQ291bnQiLCJpbmNyZW1lbnQiLCJtZXNzYWdlIiwiZXJyIiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/project/invite/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n// backend/lib/prisma.ts\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdCQUF3QjtBQUNzQjtBQUU5QyxNQUFNQyxrQkFBa0JDO0FBRXhCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlILHdEQUFZQTtBQUV6RCxJQUFJSSxJQUFxQyxFQUFFSCxnQkFBZ0JFLE1BQU0sR0FBR0E7QUFFcEUsaUVBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcZGtmZnBcXG15LWFwcFxcbXktYXBwXFxiYWNrZW5kXFxsaWJcXHByaXNtYS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBiYWNrZW5kL2xpYi9wcmlzbWEudHNcclxuaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XHJcblxyXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWxUaGlzIGFzIHVua25vd24gYXMgeyBwcmlzbWE6IFByaXNtYUNsaWVudCB9O1xyXG5cclxuY29uc3QgcHJpc21hID0gZ2xvYmFsRm9yUHJpc21hLnByaXNtYSB8fCBuZXcgUHJpc21hQ2xpZW50KCk7XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpc21hO1xyXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsInByb2Nlc3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproject%2Finvite%2Froute&page=%2Fapi%2Fproject%2Finvite%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproject%2Finvite%2Froute.ts&appDir=C%3A%5CUsers%5Cdkffp%5Cmy-app%5Cmy-app%5Cbackend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdkffp%5Cmy-app%5Cmy-app%5Cbackend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproject%2Finvite%2Froute&page=%2Fapi%2Fproject%2Finvite%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproject%2Finvite%2Froute.ts&appDir=C%3A%5CUsers%5Cdkffp%5Cmy-app%5Cmy-app%5Cbackend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdkffp%5Cmy-app%5Cmy-app%5Cbackend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_dkffp_my_app_my_app_backend_app_api_project_invite_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/project/invite/route.ts */ \"(rsc)/./app/api/project/invite/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/project/invite/route\",\n        pathname: \"/api/project/invite\",\n        filename: \"route\",\n        bundlePath: \"app/api/project/invite/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\dkffp\\\\my-app\\\\my-app\\\\backend\\\\app\\\\api\\\\project\\\\invite\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_dkffp_my_app_my_app_backend_app_api_project_invite_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwcm9qZWN0JTJGaW52aXRlJTJGcm91dGUmcGFnZT0lMkZhcGklMkZwcm9qZWN0JTJGaW52aXRlJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGcHJvamVjdCUyRmludml0ZSUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNka2ZmcCU1Q215LWFwcCU1Q215LWFwcCU1Q2JhY2tlbmQlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q2RrZmZwJTVDbXktYXBwJTVDbXktYXBwJTVDYmFja2VuZCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDOEI7QUFDM0c7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXGRrZmZwXFxcXG15LWFwcFxcXFxteS1hcHBcXFxcYmFja2VuZFxcXFxhcHBcXFxcYXBpXFxcXHByb2plY3RcXFxcaW52aXRlXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9wcm9qZWN0L2ludml0ZS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3Byb2plY3QvaW52aXRlXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9wcm9qZWN0L2ludml0ZS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXGRrZmZwXFxcXG15LWFwcFxcXFxteS1hcHBcXFxcYmFja2VuZFxcXFxhcHBcXFxcYXBpXFxcXHByb2plY3RcXFxcaW52aXRlXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproject%2Finvite%2Froute&page=%2Fapi%2Fproject%2Finvite%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproject%2Finvite%2Froute.ts&appDir=C%3A%5CUsers%5Cdkffp%5Cmy-app%5Cmy-app%5Cbackend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdkffp%5Cmy-app%5Cmy-app%5Cbackend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproject%2Finvite%2Froute&page=%2Fapi%2Fproject%2Finvite%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproject%2Finvite%2Froute.ts&appDir=C%3A%5CUsers%5Cdkffp%5Cmy-app%5Cmy-app%5Cbackend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdkffp%5Cmy-app%5Cmy-app%5Cbackend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();