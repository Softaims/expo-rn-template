import { useCallback, useMemo } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import { BarGroup, Button, ScreenWrapper } from "@/components";
import { SplashButtons, SplashContent } from "@/modules/splash/components";
import { SPLASH_SCREENS, TOTAL_STEPS } from "@/modules/splash/config";
import { useSplashAnimation, useSplashNavigation } from "@/modules/splash/hooks";
import type { SplashScreenData } from "@/modules/splash/types";
import { useTheme } from "@/lib/theme";
import { createSlideStyles, styles } from "./SplashScreen.styles";

export default function SplashScreen() {
  const { width } = useWindowDimensions();
  const { colors, spacing } = useTheme();

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

  const slideStyles = useMemo(
    () => createSlideStyles(width, spacing.page),
    [width, spacing.page]
  );

  const renderItem = useCallback(
    ({ item }: { item: SplashScreenData }) => (
      <View style={slideStyles.slide}>
        <SplashContent
          title={item.title}
          description={item.description}
        />
      </View>
    ),
    [slideStyles]
  );

  const keyExtractor = useCallback(
    (item: SplashScreenData) => item.id.toString(),
    []
  );

  return (
    <ScreenWrapper containerStyle={{ paddingHorizontal: 0 }}>
      <View
        style={[styles.mainColumn, { backgroundColor: colors.background }]}
      >
        {currentScreen.showSkipButton ? (
          <View style={[styles.topBar, { paddingHorizontal: spacing.page }]}>
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
            contentContainerStyle={styles.flatListContent}
          />

          <SplashButtons buttons={buttonsWithHandlers} />
        </View>
      </View>
    </ScreenWrapper>
  );
}
