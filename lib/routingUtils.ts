import { Href, useRouter } from "expo-router";

export function useRoutingUtils() {
    const router = useRouter();

    const push = (path: Href) => {
        router.push(path);
    };

    const back = () => {
        router.back();
    };

    return {
        push,
        back,
    };
}