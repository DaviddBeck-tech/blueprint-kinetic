import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import i18n, { parseLang } from "./lib/i18n";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Đặt ngôn ngữ SSR theo cookie của request để HTML server render khớp với client (tránh lệch hydration).
const langMiddleware = createMiddleware().server(async ({ next, request }) => {
  await i18n.changeLanguage(parseLang(request.headers.get("cookie")));
  return next();
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware, langMiddleware],
}));
