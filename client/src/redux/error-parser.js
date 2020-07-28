export default function (error) {
    return {
        message: error.response.data.message,
        status: error.response.status
    }
}