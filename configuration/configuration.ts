type authentication_configuration_type_ =
    {
        secretOrPrivateKey: string;
        token_expiration_minutes: number;
        authenticationHeader: string;
    }

export let authenticationConfiguration: authentication_configuration_type_ = Object.freeze({
    secretOrPrivateKey: "berlin-authentication-server",
    token_expiration_minutes: 0x20,
    authenticationHeader: "Authentication-Token".toLowerCase()
});
