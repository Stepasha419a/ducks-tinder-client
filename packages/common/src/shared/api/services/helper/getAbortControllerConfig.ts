import type { AxiosRequestConfig } from 'axios';

const controllersMap: Map<string, AbortController[]> = new Map();

export function getOptionalAbortControllerConfig(
  id: string,
  returnConfig?: boolean
): AxiosRequestConfig {
  if (!returnConfig) {
    return {};
  }

  return getAbortControllerConfig(id);
}

export function getAbortControllerConfig(id: string): AxiosRequestConfig {
  if (!controllersMap.has(id)) {
    controllersMap.set(id, []);
  }

  const controllers = controllersMap.get(id)!;
  if (controllers.length) {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < controllers.length; i++) {
      const controller = controllers.shift();
      controller?.abort();
    }
  }

  const controller = new AbortController();
  controllers.push(controller);

  return { signal: controller.signal };
}
