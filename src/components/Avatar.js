export default function Avatar({ user, size = "size-9" }) {
  return (
    <div className="avatar">
      <div className={`${size} grid place-items-center rounded-full bg-primary text-primary-content`}>
        {user?.image ? <img src={user.image} alt={user.name} referrerPolicy="no-referrer" /> : <span className="font-bold">{user?.name?.[0]?.toUpperCase()}</span>}
      </div>
    </div>
  );
}
