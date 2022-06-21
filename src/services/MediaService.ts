class MediaService {
  public getRandomMedias() {
    const mockMedias: string[] = [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Netta_rufina_-Bushy_Park%2C_London%2C_England_-swimming-8.jpg/1200px-Netta_rufina_-Bushy_Park%2C_London%2C_England_-swimming-8.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Netta_rufina_-Bushy_Park%2C_London%2C_England_-swimming-8.jpg/1200px-Netta_rufina_-Bushy_Park%2C_London%2C_England_-swimming-8.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Netta_rufina_-Bushy_Park%2C_London%2C_England_-swimming-8.jpg/1200px-Netta_rufina_-Bushy_Park%2C_London%2C_England_-swimming-8.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Netta_rufina_-Bushy_Park%2C_London%2C_England_-swimming-8.jpg/1200px-Netta_rufina_-Bushy_Park%2C_London%2C_England_-swimming-8.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Netta_rufina_-Bushy_Park%2C_London%2C_England_-swimming-8.jpg/1200px-Netta_rufina_-Bushy_Park%2C_London%2C_England_-swimming-8.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Netta_rufina_-Bushy_Park%2C_London%2C_England_-swimming-8.jpg/1200px-Netta_rufina_-Bushy_Park%2C_London%2C_England_-swimming-8.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Netta_rufina_-Bushy_Park%2C_London%2C_England_-swimming-8.jpg/1200px-Netta_rufina_-Bushy_Park%2C_London%2C_England_-swimming-8.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Netta_rufina_-Bushy_Park%2C_London%2C_England_-swimming-8.jpg/1200px-Netta_rufina_-Bushy_Park%2C_London%2C_England_-swimming-8.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Netta_rufina_-Bushy_Park%2C_London%2C_England_-swimming-8.jpg/1200px-Netta_rufina_-Bushy_Park%2C_London%2C_England_-swimming-8.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Netta_rufina_-Bushy_Park%2C_London%2C_England_-swimming-8.jpg/1200px-Netta_rufina_-Bushy_Park%2C_London%2C_England_-swimming-8.jpg',
    ]

    const mockGuedesMedias: string[] = [
      'https://tsmizhboblolhhcxhtbz.supabase.co/storage/v1/object/sign/finebouche/family/17768dd7-84b5-4871-b39c-f63e2d8e5beb/medias/PXL_20211107_105506771.MP.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaW5lYm91Y2hlL2ZhbWlseS8xNzc2OGRkNy04NGI1LTQ4NzEtYjM5Yy1mNjNlMmQ4ZTViZWIvbWVkaWFzL1BYTF8yMDIxMTEwN18xMDU1MDY3NzEuTVAuanBnIiwiaWF0IjoxNjU1ODE1MzgyLCJleHAiOjE5NzExNzUzODJ9.OsRhJPsyOs5eR4KJHSCE2Stq36W5uOio7m6qBErJCLE',
      'https://tsmizhboblolhhcxhtbz.supabase.co/storage/v1/object/sign/finebouche/family/17768dd7-84b5-4871-b39c-f63e2d8e5beb/medias/PXL_20220529_101644468.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaW5lYm91Y2hlL2ZhbWlseS8xNzc2OGRkNy04NGI1LTQ4NzEtYjM5Yy1mNjNlMmQ4ZTViZWIvbWVkaWFzL1BYTF8yMDIyMDUyOV8xMDE2NDQ0NjguanBnIiwiaWF0IjoxNjU1ODE1NDcyLCJleHAiOjE5NzExNzU0NzJ9.PpJeUpoDrgUrilkjvOwT8QJXHQj6nQ2DuKccwkN15zE',
      'https://tsmizhboblolhhcxhtbz.supabase.co/storage/v1/object/sign/finebouche/family/17768dd7-84b5-4871-b39c-f63e2d8e5beb/medias/IMG_20210804_203524.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaW5lYm91Y2hlL2ZhbWlseS8xNzc2OGRkNy04NGI1LTQ4NzEtYjM5Yy1mNjNlMmQ4ZTViZWIvbWVkaWFzL0lNR18yMDIxMDgwNF8yMDM1MjQuanBnIiwiaWF0IjoxNjU1ODE1MzcxLCJleHAiOjE5NzExNzUzNzF9.pzmG6lgkpClDHACZInfSLnVuScjeY80gUl_VxNk8VDo',
      'https://tsmizhboblolhhcxhtbz.supabase.co/storage/v1/object/sign/finebouche/family/17768dd7-84b5-4871-b39c-f63e2d8e5beb/medias/paella.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaW5lYm91Y2hlL2ZhbWlseS8xNzc2OGRkNy04NGI1LTQ4NzEtYjM5Yy1mNjNlMmQ4ZTViZWIvbWVkaWFzL3BhZWxsYS5qcGciLCJpYXQiOjE2NTU4MTQ1OTYsImV4cCI6MTk3MTE3NDU5Nn0.V-YRDgpZra8GuHKIzd7CI6frUcqKyOnX9vnzvd-fmUI',
      'https://tsmizhboblolhhcxhtbz.supabase.co/storage/v1/object/sign/finebouche/family/17768dd7-84b5-4871-b39c-f63e2d8e5beb/medias/PXL_20220522_142959479.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaW5lYm91Y2hlL2ZhbWlseS8xNzc2OGRkNy04NGI1LTQ4NzEtYjM5Yy1mNjNlMmQ4ZTViZWIvbWVkaWFzL1BYTF8yMDIyMDUyMl8xNDI5NTk0NzkuanBnIiwiaWF0IjoxNjU1ODE1Mzk4LCJleHAiOjE5NzExNzUzOTh9.SDIxMxwT5IwgRWZvu0xhWPSgu2eTbQvZDNYXEDgArr8',
      'https://tsmizhboblolhhcxhtbz.supabase.co/storage/v1/object/sign/finebouche/family/17768dd7-84b5-4871-b39c-f63e2d8e5beb/medias/SDC18562-1.JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaW5lYm91Y2hlL2ZhbWlseS8xNzc2OGRkNy04NGI1LTQ4NzEtYjM5Yy1mNjNlMmQ4ZTViZWIvbWVkaWFzL1NEQzE4NTYyLTEuSlBHIiwiaWF0IjoxNjU1ODE1NTMyLCJleHAiOjE5NzExNzU1MzJ9.a__Xqni-4z0hededdq8o-Hmj_49Ac59E9P3DIR3TLOY',
      'https://tsmizhboblolhhcxhtbz.supabase.co/storage/v1/object/sign/finebouche/family/17768dd7-84b5-4871-b39c-f63e2d8e5beb/medias/100_2222.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaW5lYm91Y2hlL2ZhbWlseS8xNzc2OGRkNy04NGI1LTQ4NzEtYjM5Yy1mNjNlMmQ4ZTViZWIvbWVkaWFzLzEwMF8yMjIyLmpwZyIsImlhdCI6MTY1NTgxNDU0OCwiZXhwIjoxOTcxMTc0NTQ4fQ.aHJsRrmXkkNQws3YXo4ZQJAn5f3_96NbGR3v0kaXsfs',
      'https://tsmizhboblolhhcxhtbz.supabase.co/storage/v1/object/sign/finebouche/family/17768dd7-84b5-4871-b39c-f63e2d8e5beb/medias/SDC18007.JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaW5lYm91Y2hlL2ZhbWlseS8xNzc2OGRkNy04NGI1LTQ4NzEtYjM5Yy1mNjNlMmQ4ZTViZWIvbWVkaWFzL1NEQzE4MDA3LkpQRyIsImlhdCI6MTY1NTgxNDYwNywiZXhwIjoxOTcxMTc0NjA3fQ.dlCn3gPhCuEikahlrqydCZ4FwDvEqMZr-HAXtwp71eo',
      'https://tsmizhboblolhhcxhtbz.supabase.co/storage/v1/object/sign/finebouche/family/17768dd7-84b5-4871-b39c-f63e2d8e5beb/medias/Noel et luge 2007 006.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaW5lYm91Y2hlL2ZhbWlseS8xNzc2OGRkNy04NGI1LTQ4NzEtYjM5Yy1mNjNlMmQ4ZTViZWIvbWVkaWFzL05vZWwgZXQgbHVnZSAyMDA3IDAwNi5qcGciLCJpYXQiOjE2NTU4MTQ2MDMsImV4cCI6MTk3MTE3NDYwM30.5hDX9CKGZPU-igVo8_QDgAL-yiwmlfKRoc12vD4AZMw',
      'https://tsmizhboblolhhcxhtbz.supabase.co/storage/v1/object/sign/finebouche/family/17768dd7-84b5-4871-b39c-f63e2d8e5beb/medias/Noel et luge 2007 006.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaW5lYm91Y2hlL2ZhbWlseS8xNzc2OGRkNy04NGI1LTQ4NzEtYjM5Yy1mNjNlMmQ4ZTViZWIvbWVkaWFzL05vZWwgZXQgbHVnZSAyMDA3IDAwNi5qcGciLCJpYXQiOjE2NTU4MTQ2MDMsImV4cCI6MTk3MTE3NDYwM30.5hDX9CKGZPU-igVo8_QDgAL-yiwmlfKRoc12vD4AZMw',
    ]
    const family = localStorage.getItem('familyId')
    return family === '17768dd7-84b5-4871-b39c-f63e2d8e5beb'
      ? mockGuedesMedias
      : mockMedias
  }
}
export default new MediaService()
