export const jsonToFormData = (
    json: Record<string, any>,
    formData: FormData = new FormData(),
    parentKey: string | null = null
): FormData => {
    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            const value = json[key];
            // Jika parentKey null, formKey akan menggunakan key langsung, jika tidak, gunakan notasi key yang sudah didefinisikan sebelumnya
            const formKey = parentKey ? `${parentKey}[${key}]` : key;

            if (typeof value === 'object' && !(value instanceof File)) {
                // Jika value adalah object atau array, rekursif untuk menambahkan ke FormData
                jsonToFormData(value, formData, formKey);
            } else {
                // Tambahkan key dan value ke FormData
                formData.append(formKey, value);
            }
        }
    }

    return formData;
};

export const removeNullValue = (object: Record<string, any>) => {
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const value = object[key];

            if (value === null || value === undefined || value === "") {
                delete object[key];
            }
        }
    }

    return object;

};