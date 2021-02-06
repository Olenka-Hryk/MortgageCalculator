interface DatabaseConfig {
  readonly connectionString: string;
}

const config: DatabaseConfig = {
  connectionString: 'mongodb+srv://olenka:hryk11@bankmanagement.cytrr.mongodb.net/test'
};

export { DatabaseConfig, config };
