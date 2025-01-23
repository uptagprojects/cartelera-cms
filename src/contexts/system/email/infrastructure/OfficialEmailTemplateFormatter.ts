export class OfficialEmailTemplateFormatter {
	async format(
		template: string,
		parameters: Record<string, string | number | Array<string | number>>
	): Promise<string> {
		return Promise.resolve(template);
	}
}
