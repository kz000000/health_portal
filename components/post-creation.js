import { parseISO, format } from 'date-fns'

function DateFormatter({ dateString }) {
  return <time dateTime={dateString}>{format(parseISO(dateString), 'LLLL	d, yyyy')}</time>
}


export default function PostCreation({ author, date }) {
  return (
    <div className="flex flex-row items-center content-center">
      <img src={author.picture} className="w-12 h-12 rounded-full mr-4" alt={author.name} />

      <div>
        <div className="text-xl font-bold">{author.name}</div>
        <DateFormatter dateString={date} />
      </div>
    </div>
  )
}
