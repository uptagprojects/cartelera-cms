export interface EmailTemplateFormatter {
	format(
		template: string,
		parameters: Record<string, string | number | Array<string | number>>
	): Promise<string>;
}
