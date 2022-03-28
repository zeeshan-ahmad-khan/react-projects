function Notification({ comment, notif }) {

    return (
        <section className={notif ? "notif" : "noNotif"}>
            <h1>{comment}</h1>
        </section>
    )
}

export default Notification