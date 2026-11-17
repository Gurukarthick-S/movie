
import { describe, it, expect, vi, afterEach } from 'vitest'

describe('searchMovies', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
    vi.resetModules()
  })

  it('returns an empty array when the search is empty', async () => {
    const { searchMovies } = await import('./movieService')

    expect(await searchMovies('')).toEqual([])
  })

  it('shows an error when the API token is missing', async () => {
    vi.stubEnv('VITE_TMDB_ACCESS_TOKEN', '')
    vi.resetModules()

    const { searchMovies } = await import('./movieService')

    await expect(searchMovies('Batman')).rejects.toThrow(
      'Please add your TMDB access token to the .env file.'
    )
  })

  it('shows an error when the API request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
    }))

    const { searchMovies } = await import('./movieService')

    await expect(searchMovies('Batman')).rejects.toThrow(
      'Unable to connect to TMDB. Please try again.'
    )
  })

  it('returns formatted movie data when the search succeeds', async () => {
    vi.stubEnv('VITE_TMDB_ACCESS_TOKEN', 'test-token')

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [
          {
            id: 1,
            title: 'Batman',
            release_date: '2022-03-04',
            vote_average: 8.5,
            overview: 'A superhero movie',
            poster_path: '/batman.jpg',
          },
        ],
      }),
    }))

    vi.resetModules()

    const { searchMovies } = await import('./movieService')
    const movies = await searchMovies('Batman')

    expect(movies[0].title).toBe('Batman')
    expect(movies[0].year).toBe('2022')
    expect(movies[0].rating).toBe('8.5/10')
  })
})
