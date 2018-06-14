using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class Return : MonoBehaviour {

    public void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.tag.Equals("Projectile"))
        {
            SceneManager.LoadScene("opening");
        }
    }
}
