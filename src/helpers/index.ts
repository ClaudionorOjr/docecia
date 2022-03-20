export const formatDateString = (date?: Date) => {
    return date?.toLocaleString('pt-br', { dateStyle: 'short' })
}