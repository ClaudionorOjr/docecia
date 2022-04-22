// import firebase from "firebase/app";
// import Timestamp = firebase.firestore.Timestamp

// export function convertTimestampToDate(timestamp: Timestamp | any): Date | any {
//     return timestamp instanceof Timestamp
//     ? new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate()
//     : timestamp;
// }

export const dateFormat = (date?: Date) => {
    return date?.toLocaleString('pt-br', { dateStyle: 'short' })
}