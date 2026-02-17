import { useCallback } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import { BarGroup, Button, ScreenWrapper } from "@/components";
import { SplashButtons, SplashContent } from "@/modules/splash/components";
import { SPLASH_SCREENS, TOTAL_STEPS } from "@/modules/splash/config";
import { useSplashAnimation, useSplashNavigation } from "@/modules/splash/hooks";
import type { SplashScreenData } from "@/modules/splash/types";

export default function SplashScreen() {
  const { width } = useWindowDimensions();

  const {
    currentStep,
    animatedStep,
    flatListRef,
    handleScroll,
    handleMomentumScrollEnd,
    animateToNextStep,
  } = useSplashAnimation();

  const {
    currentScreen,
    buttonsWithHandlers,
    handleSkip,
    handleStorybook,
  } = useSplashNavigation({ currentStep, animateToNextStep });

  const renderItem = useCallback(({ item }: { item: SplashScreenData }) => (
    <View style={{ width }} className="px-4">
      <SplashContent
        title={item.title}
        description={item.description}
      />
    </View>
  ), [width]);

  const keyExtractor = useCallback((item: SplashScreenData) => item.id.toString(), []);

  return (
    <ScreenWrapper containerStyles="px-0">
      <View className="flex-1 justify-between bg-background">
        {currentScreen.showSkipButton ? (
          <View className="flex-row justify-between items-center px-4">
            <Button
              variant="text"
              size="sm"
              title="Storybook"
              onPress={handleStorybook}
              containerStyles="bg-transparent"
              textStyles="font-medium"
            />
            <Button
              variant="text"
              size="sm"
              title="Skip"
              onPress={handleSkip}
              textStyles="font-medium"
            />
          </View>
        ) : (
          <View />
        )}

        <View>
          <BarGroup
            containerStyles="items-center mb-8"
            totalSteps={TOTAL_STEPS}
            currentStep={currentStep}
            progress={(currentStep / TOTAL_STEPS) * 100}
            variant="bar"
            animatedStep={animatedStep}
          />

          <FlatList
            ref={flatListRef}
            data={SPLASH_SCREENS}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            onScroll={handleScroll}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            scrollEventThrottle={16}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            contentContainerClassName="mb-[32px]"
          />

          <SplashButtons buttons={buttonsWithHandlers} />
        </View>
      </View>
    </ScreenWrapper>
  );
}
