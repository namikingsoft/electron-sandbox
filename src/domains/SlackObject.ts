export interface UserObject {
  id: string
  name: string
  profile: {
    email: string,
    image_24: string,
    image_32: string,
    image_48: string,
    image_72: string,
    image_192: string,
    image_512: string,
  }
}

export interface UserListObject {
  members: Array<UserObject>
}

export interface ChannelObject {
  id: string
  name: string
}

export interface ChannelListObject {
  channels: Array<ChannelObject>
}

export interface MessageObject {
  text: string
  user: string
  channel: string
}
