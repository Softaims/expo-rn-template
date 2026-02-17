import { Pressable } from "react-native";
import { ArrowLeftIcon } from "@/assets/icons";
import { useRoutingUtils } from "@/lib/routingUtils";
import { cn } from "@/lib/utils";

interface HeaderBackButtonProps {
    onPress?: () => void;
    containerStyles?: string;
}

export function HeaderBackButton({ onPress, containerStyles }: HeaderBackButtonProps) {
    const { back } = useRoutingUtils();
    return (
        <Pressable onPress={onPress || back} className={cn("p-[11px]", containerStyles)}>
            <ArrowLeftIcon />
        </Pressable>
    );
}