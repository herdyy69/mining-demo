import { PeopleSeeder } from './people'

const main = async () => {
  try {
    const people = await PeopleSeeder()
    console.log('People seeder completed:', people)

    return {
      people,
    }
  } catch (error) {
    console.error('Seed process failed:', error)
    process.exit(1)
  }
}


main()
  .then((result) => {
    console.log('All seeders completed:', result)
  })
  .catch((error) => {
    console.error('Seed process failed:', error)
  })
  .finally(() => {
    console.log('Seed process finished. Exiting...')
    process.exit(0)
  })
