class MediaService {
  public getRandomMedias() {
    const mockMedias: string[] = [
      'https://upload.wikimedia.org/wikipedia/commons/b/b6/Erithacus_rubecula_-Netherlands-8.jpg',
      'https://www.chasseauvergnerhonealpes.com/wp-content/uploads/2018/03/la-nette-rousse-1200x675.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Netta_rufina_-Bushy_Park%2C_London%2C_England_-swimming-8.jpg/1200px-Netta_rufina_-Bushy_Park%2C_London%2C_England_-swimming-8.jpg',
      'http://www.oiseaux-europe.com/Dessin/dess0091.gif',
      'https://upload.wikimedia.org/wikipedia/commons/b/b6/Erithacus_rubecula_-Netherlands-8.jpg',
      'https://static.aujardin.info/cache/th/adb/mesange-bleue-600x450.jpg',
      'https://static.aujardin.info/cache/th/adb/mesange-bleue-600x450.jpg',
      'https://www.chasseauvergnerhonealpes.com/wp-content/uploads/2018/03/la-nette-rousse-1200x675.jpg',
    ]

    return mockMedias
  }
}
export default new MediaService()
