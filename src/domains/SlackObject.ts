export interface UserObject {
  id: string
  name: string
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
