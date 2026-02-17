import { Href, useRouter } from "expo-router";

export function useRoutingUtils() {
    const router = useRouter();

    const push = (path: Href) => {
        router.push(path);
    };

    const back = () => {
        router.back();
    };

    const replace = (path: Href) => {
        router.replace(path);
    };

    const dismissAll = () => {
        router.dismissAll();
    };

    return {
        push,
        back,
        replace,
        dismissAll,
    };
}