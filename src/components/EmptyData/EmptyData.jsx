import "./EmptyData.css"

export default function EmptyData({displayText}) {
    return  (
    <div className="empty-data-container">
        <p>{displayText}</p>
    </div>
    )
}