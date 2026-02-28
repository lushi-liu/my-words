import FuriganaText from '@/src/components/FuriganaText';
import dbConnect from '@/src/lib/mongodb';
import Vocabulary from '@/src/models/Vocabulary';

async function getVocabEntries() {
  await dbConnect();
  return Vocabulary.find({}).sort({ createdAt: -1 }).limit(100).lean();
}

export default async function DictionaryPage() {
  const entries = await getVocabEntries();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-48 text-blue-dark mb-10 font-bold">Dictionary</h1>

      {entries.length === 0 ? (
        <p className="text-20 text-white-500">No saved words yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry: any) => (
            <div
              key={entry._id.toString()}
              className="bg-white-900/80 border-black-300/20 rounded-xl border p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="text-24 text-blue-dark mb-2 font-bold">
                {entry.english}
              </div>
              <div className="text-20 text-black-200">
                <FuriganaText text={entry.japanese} />
              </div>
              {entry.notes && (
                <p className="text-16 text-white-500 mt-3 italic">
                  {entry.notes}
                </p>
              )}
              {entry.category !== 'other' && (
                <span className="text-14 text-blue-light bg-blue-light/10 mt-2 inline-block rounded-full px-3 py-1">
                  {entry.category}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
