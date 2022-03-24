
export const date_diff_indays = (createdDate: Date, todayDate: Date) => {
    const dt1 = new Date(createdDate);
    const dt2 = todayDate;
    return Math.floor((Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) - Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate())) / (1000 * 60 * 60 * 24));
};