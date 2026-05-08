import React, { useRef, useEffect } from "react";

export function TurnstileWidget({ siteKey, onSuccess, onError, onExpired }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    const render = () => {
      if (containerRef.current &&
        window.turnstile &&
        widgetIdRef.current === null) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: "light",
          callback: onSuccess,
          "error-callback": onError,
          "expired-callback": onExpired,
        });
      }
    };

    if (window.turnstile) {
      render();
    } else {
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval);
          render();
        }
      }, 100);
      return () => clearInterval(interval);
    }

    return () => {
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} className="flex justify-center" />;
}
