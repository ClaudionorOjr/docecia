export const dateFormat = (date?: Date) => {
    return date?.toLocaleString('pt-br', { dateStyle: 'short' })
}