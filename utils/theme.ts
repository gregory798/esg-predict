import type { ColorAction, ColorKey, ColorType, ThemeColor } from "@/types/theme.d"
import { colord } from "colord"
import _get from "lodash/get"

export const COLOR_SHADES = ["005", "010", "015", "020", "030", "040", "050", "060", "070", "080", "090"] as const

export type ColorShade = (typeof COLOR_SHADES)[number]

export function toggleSidebarClass(
	sidebarCollapsed: boolean,
	elementId: string,
	classOpen: string,
	classClose: string
) {
	const el = window?.document?.getElementById(elementId)
	if (!el) return

	el.classList.toggle(classOpen, !sidebarCollapsed)
	el.classList.toggle(classClose, sidebarCollapsed)
}

export function colorToArray(color: string, output: "rgb" | "hsl"): number[] {
	const colorObject = colord(color)

	switch (output) {
		case "rgb": {
			const { r, g, b } = colorObject.toRgb()
			return [r, g, b]
		}
		case "hsl": {
			const { h, s, l } = colorObject.toHsl()
			return [h, s, l]
		}
		default:
			throw new Error("Invalid output type")
	}
}

export function exposure(color: string, amount: number): string {
	if (amount >= 0) {
		return colord(color).lighten(amount).desaturate(amount).toHex()
	}
	return colord(color)
		.lighten(amount)
		.desaturate(amount * -1)
		.toHex()
}

export function getColorShades(color: string): { [key in ColorShade]: string } {
	return COLOR_SHADES.reduce<{ [key in ColorShade]: string }>(
		(acc, shade) => {
			acc[shade] = colord(color)
				.alpha(Number.parseInt(shade, 10) / 100)
				.toRgbString()
			return acc
		},
		{} as { [key in ColorShade]: string }
	)
}

export function getTypeValue(origin: object, val: string) {
	if (val && val.indexOf("{") === 0) {
		const path = val.replace("{", "").replace("}", "")
		return _get(origin, path)
	}

	return val
}

export function getThemeColors(colors: Record<ColorType, string>) {
	const colorActions: ColorAction[] = [
		{ scene: "", handler: color => color },
		{ scene: "Suppl", handler: color => exposure(color, 0.1) },
		{ scene: "Hover", handler: color => exposure(color, 0.05) },
		{ scene: "Pressed", handler: color => exposure(color, -0.2) }
	]

	const themeColor: ThemeColor = {}

	for (const colorType in colors) {
		const colorValue = colors[colorType as ColorType]

		colorActions.forEach(action => {
			const colorKey: ColorKey = `${colorType as ColorType}Color${action.scene}`
			themeColor[colorKey] = action.handler(colorValue)
		})
	}

	return themeColor
}
