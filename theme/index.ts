import tokens from "@/design-tokens.json"
import { Layout, RouterTransition, ThemeNameEnum } from "@/types/theme.d"
import { colorToArray, getColorShades } from "@/utils/theme"
import { type ThemeCommonVars, useOsTheme } from "naive-ui"

type ThemeState = ReturnType<typeof getDefaultState>

interface ThemeGetters {
	dividerColor: string
	hoverColor: string
	primaryColor: string
	secondaryColors: { [key: string]: string }
	sidebarBackground: string
	bodyBackground: string
	backgroundSecondaryColor: string
	naiveCommon: ThemeCommonVars
}

const osTheme = useOsTheme()

export function getDefaultState() {
	return {
		layout: Layout.VerticalNav, // Type of layout, with vertical or horizontal navigation
		themeName: osTheme.value === "dark" ? ThemeNameEnum.Dark : ThemeNameEnum.Light, // Theme name (Dark, Light), with fallback to the light theme
		routerTransition: RouterTransition.FadeUp, // Type of transition for the router
		routerTransitionDuration: 0.3, // Duration of the router transition in seconds
		rtl: false, // RTL (right to left) mode toggle
		boxed: {
			enabled: true, // Choose whether to apply a maximum width to the page
			toolbar: true, // Choose whether to apply the maximum width to the toolbar as well
			width: 1600 // Maximum width size in pixels
		},
		sidebar: {
			autoClose: true, // Choose whether to automatically close the sidebar when the view goes below the "autoCloseBreakpoint" value
			collapsed: false, // Indicates if the sidebar is collapsed
			autoCloseBreakpoint: 1000, // Breakpoint for the automatic closing of the sidebar (in pixels)
			animEase: "ease-in-out", // Type of easing for animations
			animDuration: 0.3, // Duration of sidebar animations (in seconds)
			openWidth: 300, // Width of the open sidebar (in pixels)
			closeWidth: 64 // Width of the closed sidebar (in pixels)
		},
		footer: {
			show: true // Show or hide the footer
		},
		responsive: {
			breakpoint: 700, // Breakpoint in pixels (Desk -> Mobile)
			// Parameters to be adjusted based on the breakpoint
			override: {
				viewPadding: {
					desk: 40, // View padding for desktop
					mobile: 20 // View padding for mobile devices
				},
				toolbarHeight: {
					desk: 80, // Height of the toolbar for desktop
					mobile: 70 // Height of the toolbar for mobile devices
				}
			}
		},
		toolbarHeight: 80, // Default toolbar height (in pixels)
		viewPadding: 40, // Default view padding (in pixels)
		headerBarHeight: 60, // Height of the header bar (in pixels)
		colors: tokens.colors, // Color definitions from the token
		borderRadius: tokens.borderRadius, // Border radius from the token
		lineHeight: tokens.lineHeight, // Line height from the token
		fontSize: tokens.fontSize, // Font size from the token
		fontFamily: tokens.fontFamily, // Font family from the token
		typography: tokens.typography // Typography configurations from the token
	}
}

export function getCssVars(state: ThemeState, getters: ThemeGetters): { [key: string]: string } {
	const naive = getters.naiveCommon

	const bgColor = naive.baseColor
	const bgSecondaryColor = getters.backgroundSecondaryColor
	const fgColor = naive.textColorBase
	const fgSecondaryColor = naive.textColor3

	const tabFgColorActive = naive.textColor2
	const borderColor = naive.dividerColor
	const primaryColor = naive.primaryColor

	const successColor = naive.successColor
	const errorColor = naive.errorColor
	const warningColor = naive.warningColor
	const infoColor = naive.infoColor

	const modalColor = naive.modalColor
	const codeColor = naive.codeColor
	const tabColor = naive.tabColor
	const tabColorActive = naive.inputColor
	const bezierEase = naive.cubicBezierEaseInOut

	const buttonColorSecondary = naive.buttonColor2
	const buttonColorSecondaryHover = naive.buttonColor2Hover
	const buttonColorSecondaryPressed = naive.buttonColor2Pressed

	const bgSidebar = getters.sidebarBackground
	const bgBody = getters.bodyBackground

	const boxedWidth = state.boxed.width
	const routerTransitionDuration = state.routerTransitionDuration
	const sidebarAnimEase = state.sidebar.animEase
	const sidebarAnimDuration = state.sidebar.animDuration
	const sidebarOpenWidth = state.sidebar.openWidth
	const sidebarCloseWidth = state.sidebar.closeWidth
	const toolbarHeight = state.toolbarHeight
	const viewPadding = state.viewPadding
	const headerBarHeight = state.headerBarHeight
	const fontFamily = state.fontFamily.base
	const fontFamilyDisplay = state.fontFamily.display
	const fontFamilyMono = state.fontFamily.mono

	const borderRadius = state.borderRadius.base
	const borderRadiusSmall = state.borderRadius.small

	const dividerColor = getters.dividerColor
	const hoverColor = getters.hoverColor
	const { secondary1, secondary2, secondary3, secondary4 } = getters.secondaryColors

	// This style object, imported via the themeStore, will be available application-wide and is exposed in the HTML tag as a list of CSS variables, which you can use in your CSS/SCSS code like: var(--bg-default-color)
	const styleObject: { [key: string]: string } = {
		"bg-body-color": `${bgBody}`,
		"bg-sidebar-color": `${bgSidebar}`,

		"fg-default-color": `${fgColor}`,
		"fg-secondary-color": `${fgSecondaryColor}`,
		"bg-default-color": `${bgColor}`,
		"bg-secondary-color": `${bgSecondaryColor}`,

		"bezier-ease": `${bezierEase}`,
		"router-transition-duration": `${routerTransitionDuration}s`,
		"sidebar-anim-ease": `${sidebarAnimEase}`,
		"sidebar-anim-duration": `${sidebarAnimDuration}s`,
		"sidebar-open-width": `${sidebarOpenWidth}px`,
		"sidebar-close-width": `${sidebarCloseWidth}px`,
		"boxed-width": `${boxedWidth}px`,
		"toolbar-height": `${toolbarHeight}px`,
		"header-bar-height": `${headerBarHeight}px`,
		"view-padding": `${viewPadding}px`,
		"border-radius": `${borderRadius}`,
		"border-radius-small": `${borderRadiusSmall}`,

		"font-family": `${fontFamily}`,
		"font-family-display": `${fontFamilyDisplay}`,
		"font-family-mono": `${fontFamilyMono}`,

		"border-color": `${borderColor}`,
		"code-color": `${codeColor}`,
		"hover-color": `${hoverColor}`,
		"divider-color": `${dividerColor}`,
		"primary-color": `${primaryColor}`,
		"tab-color": `${tabColor}`,
		"tab-color-active": `${tabColorActive}`,
		"tab-fg-color-active": `${tabFgColorActive}`,
		"modal-color": `${modalColor}`,

		"button-color-secondary": `${buttonColorSecondary}`,
		"button-color-secondary-hover": `${buttonColorSecondaryHover}`,
		"button-color-secondary-pressed": `${buttonColorSecondaryPressed}`,

		"success-color": `${successColor}`,
		"error-color": `${errorColor}`,
		"warning-color": `${warningColor}`,
		"info-color": `${infoColor}`,

		"secondary1-color": `${secondary1}`,
		"secondary2-color": `${secondary2}`,
		"secondary3-color": `${secondary3}`,
		"secondary4-color": `${secondary4}`,

		"border-secondary": `1px solid ${getColorShades(hoverColor)["050"]}`,
		"border-default": `1px solid ${getColorShades(dividerColor)["050"]}`
	}

	// add RGB values variant
	for (const [key, value] of Object.entries(styleObject)) {
		if (key.endsWith("-color")) {
			styleObject[`${key}-rgb`] = colorToArray(value, "rgb").join(" ")
		}
	}

	return styleObject
}
