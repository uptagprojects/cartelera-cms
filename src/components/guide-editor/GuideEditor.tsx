export function GuideEditor(guide: IGuide, ucs: IUC[]) {
    const [title, setTitle] = React.useState(guide.title);
	const [content, setContent] = React.useState(guide.content);
	const [attachments, setAttachments] = React.useState<IAttachment[]>([]);
	const [uc, setUc] = React.useState<IUC>(guide.uc);
	const [uploadError, setUploadError] = React.useState<string | null>(null);
    
    return (
        return (
            <article>
                {uploadError && (
                    <Alert
                        type="error"
                        title="Ha ocurrido un error al subir los archivos"
                        message={uploadError}
                        onClose={() => setUploadError(null)}
                    />
                )}
                <form>
                    <header>
                        <TextInput
                            size="large"
                            label="titulo"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <Select
                            label="Unidad Curricular"
                            value={uc.id}
                            onChange={e => setUc(ucs.find(e.target.value))}
                        >
                            {ucs.map((uc: IUC) => (
                                <option key={uc.id} value={uc.id}>
                                    {uc.name}
                                </option>
                            ))}
                        </Select>
                    </header>
                    <TextEditor value={content} onChange={setContent} />
                    {attachments.map(attachment => (
                        <div key={attachment.id}>
                            <a href={attachment.url}>{attachment.url}</a>
                            <Button
                                variant="tertiary"
                                label="Eliminar"
                                onClick={() =>
                                    setAttachments(attachments.filter(a => a.id !== attachment.id))
                                }
                            />
                        </div>
                    ))}
                    <FileUploader label="Agrega mas archivos aqui" onUploadFiles={handleUploadFiles} />
                    <Button variant="primary" label="Guardar" />
                </form>
            </article>
        );
    );
}