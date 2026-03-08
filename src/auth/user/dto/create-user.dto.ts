export class CreateUserDto {
    username: string;
    email: string;
    passwordHash: string;
    bio: string;
    roleName: string;
}
// son como los datos que se necesitan para crear un usuario, es decir, el formato de los datos que se van a recibir para crear un usuario
// no se incluye el id, ya que no es una info que se pide sino que solo se genera en la base de datos
