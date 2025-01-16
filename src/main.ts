import { Float, Repository, RepositoryData, RepositoryEntry, weaponConfigurations, type IRepositoryItem } from "repository-script"

const targets = [
	RepositoryData.Firearms_Pistol_Krugermeier_Dark,
	RepositoryData.Kalmer_1_Tranquilizer,
	RepositoryData.ICA_19_Black_Lilly,
	RepositoryData.ICA_19_Black_Lilly_S3,
	RepositoryData.ICA_19_Death_Baller,
	RepositoryData.ICA_19_F_A_Stealth,
	RepositoryData.TAC_4_AR_Stealth,
  RepositoryData.Sieger_300_Advanced_Ave_Maria,
]

async function main() {
  const repo = new Repository()

	const ammoConfig = repo.addItem({
		_type: "Ammo Config",
		AmmoImpactEffect: "50788343960005423",
		AmmoInFlightEffect: "18446744073709551615",
		Behaviours: ["565885d4-1b37-4767-85a4-d83b2fd41bbc"],
		GravityOverride: new Float(0), // 5.0
		ImpactEffects: ["eIE_All"],
		Name: "Penetrating BSh Bullets",
		ScopeType: new Float(0),
		UIKey: "titaniumcomposite"
	})

	const magazineConfig = repo.addItem({
		_type: "Magazine Config",
		AmmoConfig: ammoConfig,
		MagazineIndex: new Float(0),
		MagazineSize: new Float(500),
		Tags: ["All", "wallpenetratingmag"]
	})

  const actorConfig = {
    PrecisionRecoveryDelay: new Float(0.001),
    PrecisionRecoverySpeed: new Float(500.0),
    PrecisionShotDuration: new Float(0.001),
    ShotsPerMinute: new Float(1000.0),
    RecoilMax: new Float(0.001),
    ZRecoilDistance: new Float(0.01),
    MagazineConfigs: [magazineConfig],
    AllowPrecisionShot: true,
    AllowPrecisionTimeSlowdown: true
  } satisfies IRepositoryItem['ActorConfiguration']

	repo.patchAll(targets, {
		...weaponConfigurations(actorConfig),
    IsCheckedWhenFrisked: false,
	})

  const option_IsPerceivedAsWeapon = new Repository()
  option_IsPerceivedAsWeapon.patchAll(targets, {
    IsPerceivedAsWeapon: false
  })

	await option_IsPerceivedAsWeapon.save("./options/not-perceived/chunk0/unperceive.repository.json")
  await repo.save("./content/chunk0/changes.repository.json")
}
main()
